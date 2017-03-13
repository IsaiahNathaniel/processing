var pi_chudnovsky_bs = function(digits){
    
    var C = 640320;
    var C3_OVER_24 = floor(pow(C,3)/24);
    var bs = function(a, b){
        /*
        Computes the terms for binary splitting the Chudnovsky infinite series

        a(a) = +/- (13591409 + 545140134*a)
        p(a) = (6*a-5)*(2*a-1)*(6*a-1)
        b(a) = 1
        q(a) = a*a*a*C3_OVER_24

        returns P(a,b), Q(a,b) and T(a,b)
        */
        var Pab, Qab, Tab;
        if(b - a === 1){
            // Directly compute P(a,a+1), Q(a,a+1) and T(a,a+1)
            var Pab, Qab;
            if(a === 0){
                Pab = 1;
                Qab = 1;
            }
            else{
                Pab = (6*a-5)*(2*a-1)*(6*a-1);
                Qab = a*a*a*C3_OVER_24;
            }
            var Tab = Pab * (13591409 + 545140134*a); // a(a) * p(a)
            if(a && 1){
                Tab = -Tab;
            }
        }
        else{
            // Recursively compute P(a,b), Q(a,b) and T(a,b)
            // m is the midpoint of a and b
            var m = floor((a + b) / 2);
            // Recursively calculate P(a,m), Q(a,m) and T(a,m)
            var Pam= bs(a, m), Qam= bs(a, m), Tam = bs(a, m);
            // Recursively calculate P(m,b), Q(m,b) and T(m,b)
            var Pmb=bs(m, b), Qmb=bs(m, b), Tmb = bs(m, b);
            // Now combine
            Pab = Pam * Pmb;
            Qab = Qam * Qmb;
            Tab = Qmb * Tam + Pam * Tmb;
        }
        return [Pab, Qab, Tab];
    };
    
    // how many terms to compute
    var DIGITS_PER_TERM = log(C3_OVER_24/6/2/6);
    var N = digits/DIGITS_PER_TERM + 1;
    // Calclate P(0,N) and Q(0,N)
    var P= bs(0, N), Q= bs(0, N), T = bs(0, N);
    var one = pow(10,digits);
    var sqrtC = sqrt(10005*one);
    return floor((Q*426880*sqrtC) / T);
};

console.log(pi_chudnovsky_bs(1));
println(pi_chudnovsky_bs(1));

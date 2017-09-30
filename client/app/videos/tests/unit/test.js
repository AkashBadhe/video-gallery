function CoinChange(n, S) {
    // table[i] will be storing the number of solutions for
    // value i. We need n+1 rows as the table is consturcted
    // in bottom up manner using the base case (n = 0)
    var m = S.length;
    var table = [n + 1];
    var size = n + 1;

    // If n is 0 then there is 1 solution (do not include any coin)
    if (n == 0)
        return 1;

    // If n is less than 0 then no solution exists
    if (n < 0)
        return 0;

    // If there are no coins and n is greater than 0, then no solution exist
    if (m <= 0 && n >= 1)
        return 0;

    while (size--) table[size] = 0;

    // Base case (If given value is 0)
    table[0] = 1;

    for (var i = 0; i < m; i++)
        for (var j = S[i]; j <= n; j++)
            table[j] += table[j - S[i]];
    return table[n];
}


///
///
///
///
///



function printMaxSubSquare(M, R, C) {
    var i, j;
    var S = createMatrix(R, C);
    var max_of_s, max_i, max_j;


    /* Set first column of S[][]*/
    for (i = 0; i < R; i++)
        S[i][0] = M[i][0];

    /* Set first row of S[][]*/
    for (j = 0; j < C; j++)
        S[0][j] = M[0][j];

    /* Construct other entries of S[][]*/
    for (i = 1; i < R; i++) {
        for (j = 1; j < C; j++) {
            if (M[i][j] == 1)
                S[i][j] = min(S[i][j - 1], S[i - 1][j], S[i - 1][j - 1]) + 1;
            else
                S[i][j] = 0;
        }
    }

    /* Find the maximum entry, and indexes of maximum entry 
       in S[][] */
    max_of_s = S[0][0];
    max_i = 0;
    max_j = 0;
    for (i = 0; i < R; i++) {
        for (j = 0; j < C; j++) {
            if (max_of_s < S[i][j]) {
                max_of_s = S[i][j];
                max_i = i;
                max_j = j;
            }
        }
    }

    var arr = S.reduce(function(p, c) {
        return p.concat(c);
    });

    var max = Math.max.apply(null, arr); // 9
    return max;
}

function createMatrix(iRows, iCols) {
    var i;
    var j;
    var table = new Array(iRows);

    for (i = 0; i < iRows; i++) {

        table[i] = new Array(iCols);

        for (j = 0; j < iCols; j++) {
            table[i][j] = 0;
        }
    }
    return (table);
}

/* UTILITY FUNCTIONS */
/* Function to get minimum of three values */
function min(a, b, c) {
    var m = a;
    if (m > b)
        m = b;
    if (m > c)
        m = c;
    return m;
}

function landingPosition(input1) {
    var input1 = ["x#o#o#o#x#o",
	"x#o#o#o#x#x",
	"x#x#x#o#x#x",
	"x#o#x#o#o#x"]
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    for (var i = 0; i < input1.length; i++) {
        if (input1[i]) {
            input1[i] = input1[i].replaceAll('x', 0).replaceAll('o', 1).split('#');
            input1[i] = input1[i].map(function(item){
            	return parseInt(item);
            });
        }
    }
    return printMaxSubSquare(input1, input1.length, input1[0].length);
}
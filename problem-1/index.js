/** Because input is any integer, if input is
 * less then or equal to 0, out put should be 0;
*/

/** Solution 1 (Mathematic Formula):
  * Time Complexity O(1)
  * Space Complexity O(1) 
*/
const sum_to_n_a = (n) => (n < 1) ? 0 : n * (n + 1) / 2;

/** Solution 2 (For-loop):
  * Time Complexity O(n)
  * Space Complexity O(1)
*/
const sum_to_n_b = (n) => {
    if (n < 1) return 0;
    let result = 1;
    for (let i = 2; i <= n; i++) result += i;
    return result;
}

/** Solution 3 (Recursion):
  * Time Complexity O(n)
  * Space Complexity O(n)
*/
const sum_to_n_c = (n) => {
    if (n < 1) return 0;
    if (n == 1) return 1;
    return sum_to_n_c(n - 1) + n;
}
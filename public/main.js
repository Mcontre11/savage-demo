
document.getElementById('button').addEventListener('click', checkPalindrome)
function checkPalindrome() {
     let word = document.querySelector('input').value
     fetch("/api?word="+ word)
          .then(res => res.json())
          .then(data => {
               console.log("response from server", data)
               if (data.palindrome === true) {
                    document.getElementById('placeToSee').innerHTML = "It's a Palidrome!!!"
               } else {
                    document.getElementById('placeToSee').innerHTML = "It's not a` Palidrome!!!"
               }
          })
}
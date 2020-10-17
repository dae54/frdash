/**
 * @param firstName
 * the first word whose first letter is to be taken
 * @param lastName
 * the second word whose first letter is to be taken
 * @example 
 * firstName = 'foo'
 * lastName = 'bar'
 * //let avatar = setAvatar(firstName, lastName)
 * avatar => 'fb'
*/
export const setAvatar = (firstName, lastName) => {
    if (firstName && lastName) {
        return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
    }
}
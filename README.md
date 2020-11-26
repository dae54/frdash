# fund-request-dash

`I am not sure if I understood your aim by this`
```javascript
Profile.findOne({ user: req.user.id })
    .populate({
        path: ["user", ["name", "avatar"]],
        populate: { path: "following" },
```

But if what i understood is what you want, then we're lucky. here is what i got.

```javascript 
await RequestAproves.find()
         .populate('user', 'firstName surname email roleId')
         .populate({
              path: 'request',
              populate: [
                     { path: 'budgetItem', select: 'code name' },
                     { path: 'user', select: 'firstName surname' },
                   ],
             }
       )
```
`More details will come later, Sorry, I couldnt use your schema description, Incase it doesnt work out, let me know, ill try to use your schema.`


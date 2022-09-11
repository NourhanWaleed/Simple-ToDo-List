let todo = [
    {
        id: 1,
        content: "Buy groceries",
        completed: true,
        Due: "Yesterday"
    },
    {
        id: 2,
        content: "Finish Vue Task",
        completed: false,
        Due: "Tomorrow"
    },
    {
        id: 3,
        content: "Finish French English Translation Project",
        completed: false,
        Due: "Next week"
    }
]

module.exports = function(){
   return  {
        todo: todo
    }
}
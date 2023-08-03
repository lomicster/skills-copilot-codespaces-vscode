function skillsMember() {

    var member = this;
    member.name = 'Member';
    member.skills = ['JavaScript', 'CSS', 'HTML'];
    member.greet = function() {
        console.log('Hello, I\'m ' + member.name + '.');
    };
}
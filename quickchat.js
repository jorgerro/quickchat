var Chats = new Meteor.Collection("chats")

if (Meteor.isClient) {

  Meteor.startup(function () { 
    var now = Date.now();
    Session.set("loginTime", now)
  })

  Template.chatRoom.chats = function () {
    return Chats.find({timeCreated: {$gt: Session.get("loginTime")}});
  }

  Template.newMessage.events({
    "submit form.new-message": function (event) {
      event.preventDefault();
      var $message = $("input#message");
      Chats.insert({
        message: $message.val(), 
        username: Session.get("username"),
        timeCreated: Date.now()
      })
      $message.val("");
    }
  })

  Chats.find().observeChanges({
    added: function (id, fields) {
      // var $chats = $("ul#chats")
      // var $lastChat = $("ul#chats > li:last-child")
      // debugger
      // $("ul#chats").scrollTop(1000)
    }
  }) 

  Template.chatRoom.username = function () {
    return Session.get("username")
  }

  Template.chatRoom.events({
    "submit form#username": function (event) {
      event.preventDefault();
      var username = $("input#username").val();
      Session.set("username", username)
    },

    "click .reset-username": function () {
      event.preventDefault();
      Session.set("username", "")
    }
  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

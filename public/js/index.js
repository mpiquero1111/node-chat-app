var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
  });

socket.on('disconnect' , function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: message.createdAt
  });

  jQuery('#messages').append(html);
  // console.log('New Message', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} at ${message.createdAt}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: message.createdAt
  });

  jQuery('#messages').append(html);
  // console.log('New location', message);
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current Location</a>');
  // li.text(`${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // li.append(` at ${message.createdAt}`);
  // jQuery('#messages').append(li);
});

var messagetextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messagetextbox.val()
  }, function () {
      messagetextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (){
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled');
    alert ('Unable to share location').text('Send location'); //failure
  });
});

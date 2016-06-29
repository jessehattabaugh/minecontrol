var es = new EventSource('/events');

es.onmessage = function (event) {
  console.log(event.data);
};



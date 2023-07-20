import React from "react";

const PushNotification = () => {
  //How use react button?
  //https://www.npmjs.com/package/react-push-notification
  const handleSubmit = () => {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        const notification = new Notification("Hi there!", {
          body: "This is a notification!",
          tag: "test",
        });
        notification.addEventListener("error", (e) => {
          alert("error");
        });
      }
    });
  };

  const displayNotification = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Hello World!");
      });
    }
  };

  return (
    <div>
      <h1>PushNotification</h1>
      <button onClick={handleSubmit}>Click push notification</button>
    </div>
  );
};

export default PushNotification;

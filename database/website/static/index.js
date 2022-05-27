function deleteLog(logId) {
    fetch("/delete-log", {
      method: "POST",
      body: JSON.stringify({ logId: logId }),
    }).then((_res) => {
      window.location.href = "/";
    });
  }
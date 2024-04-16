export async function signalRefresh(chatId) {
  // Signal refresh to api. Run on page refresh. Allows app to
  // reset chatIdRef.current and create a new object in the chats array
  const queryParams = new URLSearchParams({
    passedId: chatId,
  }).toString();

  // console.log('chatId', chatId);

  //   fetch(`/api/chat?${queryParams}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.text().then((text) => {
  //           throw new Error(`${response.status}: ${text}`);
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then((result) => {
  //       // console.log("The Success:", result);
  //     })
  //     .catch((error) => {
  //       // console.error("The Error:", error);
  //     });

  const response = await fetch(`/api/chat?${queryParams}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return "data";
}

export async function selectModel(selectedModel) {
  console.log('selectedModel', selectedModel)
  
  const queryParams = new URLSearchParams({
    model: selectedModel,
  }).toString();

  const response = await fetch(`/api/chat-model-select?${queryParams}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return "data";
}

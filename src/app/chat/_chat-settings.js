import { Dropdown } from "@carbon/react";

const ChatSettings = () => {
  const itemsClient = ["Hetfield", "Ulrich", "Hammett", "Mustaine"];
  const itemsWriter = [
    "Philip Sherburne",
    "Mosi Reeves",
    "Hua Hsu",
    "Piotr Orlov",
    "Batman",
  ];

  return (
    <div className="chat__sidebar">
      <Dropdown
        id="client"
        className="chat__dropdown"
        label="Client"
        titleText=""
        items={itemsClient}
      />
      <Dropdown
        id="writer"
        className="chat__dropdown"
        label="Writer"
        titleText=""
        items={itemsWriter}
      />
    </div>
  );
};

export default ChatSettings;

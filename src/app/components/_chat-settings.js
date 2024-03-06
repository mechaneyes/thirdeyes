import { Dropdown } from "@carbon/react";
import { Close } from "@carbon/icons-react";

const ChatSettings = ({onClick}) => {
  const itemsClient = ["Hetfield", "Ulrich", "Hammett", "Mustaine"];
  const itemsWriter = [
    "Philip Sherburne",
    "Mosi Reeves",
    "Hua Hsu",
    "Piotr Orlov",
    "Batman",
  ];

  return (
    <>
      <Close
        onClick={onClick}
        size="32"
        className="chat__sidebar__settings__close"
      />
      <div className="chat__sidebar__settings">
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
    </>
  );
};

export default ChatSettings;

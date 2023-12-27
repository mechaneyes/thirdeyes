import { Close } from "@carbon/icons-react";
import { ButtonPrimary } from "@app/components/buttons/ButtonPrimary";

export default function Modal({ classes, onClick }) {
  return (
    <div className={`modal ${classes}`}>
      <div className="modal__inner">
        <Close />
        text
        <ButtonPrimary onClick={onClick} />
      </div>
    </div>
  );
}

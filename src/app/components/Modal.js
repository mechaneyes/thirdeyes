import { ButtonPrimary } from "@app/components/buttons/ButtonPrimary";

export default function Modal({ classes, onClick }) {
  return (
    <div className={`modal ${classes}`}>
      <div className="modal__inner">
        text
        <ButtonPrimary onClick={onClick} />
      </div>
    </div>
  );
}

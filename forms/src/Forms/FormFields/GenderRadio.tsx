import type {UseFormRegisterReturn} from "react-hook-form";

type GenderRadioProps = {
  register?: UseFormRegisterReturn<"gender">;
  errorMessage?: string
};

const GenderRadio = ({register, errorMessage}: GenderRadioProps) => {
  return (
    <div className="form-group">
      <label>Gender:</label>
      <div className="radio-group">
        <label htmlFor="male">
          <input
            type="radio"
            id="male"
            value="male"
            name='gender'
            {...register}
          />
          Male
        </label>
        <label htmlFor="female">
          <input
            type="radio"
            id="female"
            value="female"
            name='gender'
            {...register}
          />
          Female
        </label>
        <label htmlFor="other">
          <input
            type="radio"
            id="other"
            value="other"
            name='gender'
            {...register}
          />
          Other
        </label>
      </div>
      {errorMessage && <span className="error-message">{}</span>}
    </div>
  );
};

export default GenderRadio;
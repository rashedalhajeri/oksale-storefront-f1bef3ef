
import React from 'react';

interface InputFieldsProps {
  coverInputRef: React.RefObject<HTMLInputElement>;
  logoInputRef: React.RefObject<HTMLInputElement>;
  handleCoverUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  coverInputRef,
  logoInputRef,
  handleCoverUpload,
  handleLogoUpload
}) => {
  return (
    <>
      <input
        type="file"
        id="cover-upload"
        ref={coverInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleCoverUpload}
      />
      <input
        type="file"
        id="logo-upload"
        ref={logoInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleLogoUpload}
      />
    </>
  );
};

export default InputFields;

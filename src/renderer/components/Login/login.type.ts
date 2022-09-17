type HandleClickLogin = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;

type HandleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

type LoginPP = {
  onClickLogin: HandleClickLogin;
  onChangeId: HandleIdChange;
  idValue: string;
};

export { HandleClickLogin, HandleIdChange, LoginPP };

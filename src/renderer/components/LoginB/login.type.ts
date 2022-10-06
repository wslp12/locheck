type HandleClickLogin = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;

type HandleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

type LoginBProps = {
  onClickLogin: HandleClickLogin;
  onChangeCharacterName: HandleIdChange;
  characterName: string;
  onChangeTokenValue: HandleIdChange;
  tokenValue: string;
};

export { HandleClickLogin, HandleIdChange, LoginBProps };

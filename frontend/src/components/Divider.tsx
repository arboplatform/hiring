import { styled, Divider as DividerMUI } from "@mui/material";

type DividerProps = {
  children: React.ReactNode;
};

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const Divider = ({ children }: DividerProps) => {
  return (
    <Root>
      <DividerMUI>{children}</DividerMUI>
    </Root>
  );
};

export { Divider };

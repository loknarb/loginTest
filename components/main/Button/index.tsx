interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  // color?: "default" | "primary";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  // color = "default",
  icon,
  loading = false,
  ...props
}) => {
  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type="button"
      className="w-full px-4 py-1 bg-slate-500"
      disabled={loading}>
      {icon}
      {children}
    </button>
  );
};

export default Button;

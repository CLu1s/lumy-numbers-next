import clsx from "clsx";
export enum Types {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  D1 = "d1",
  D2 = "d2",
  D3 = "d3",
  MENU = "menu",
  TITLE = "title",
  CAPTION1 = "caption1",
  CAPTION2 = "caption2",
  BODY = "body",
  BODY_SMALL = "body-small",
  BUTTON = "button",
  BUTTON_SMALL = "button-small",
}

type props = {
  children: React.ReactNode;
  type?: Types;
  className?: string;
};

export const Typography = ({ children, type, className }: props) => {
  const Content = () => {
    switch (type) {
      case Types.H1:
        return (
          <h1
            className={clsx("font-headline font-semibold text-6xl", className)}
          >
            {children}
          </h1>
        );
      case Types.H2:
        return (
          <h2
            className={clsx("font-headline font-semibold text-5xl", className)}
          >
            {children}
          </h2>
        );
      case Types.H3:
        return (
          <h2 className={clsx("font-headline font-medium text-4xl", className)}>
            {children}
          </h2>
        );
      case Types.H4:
        return (
          <h2
            className={clsx("font-headline font-semibold text-3xl", className)}
          >
            {children}
          </h2>
        );
      case Types.H5:
        return (
          <h2
            className={clsx("font-headline font-semibold text-2xl", className)}
          >
            {children}
          </h2>
        );
      case Types.H6:
        return (
          <h2
            className={clsx("font-headline font-semibold text-lg", className)}
          >
            {children}
          </h2>
        );
      case Types.MENU:
        return (
          <div className={clsx("font-semibold text-sm", className)}>
            {children}
          </div>
        );
      case Types.TITLE:
        return (
          <div className={clsx("font-semibold text-base", className)}>
            {children}
          </div>
        );
      case Types.CAPTION1:
        return (
          <span className={clsx("font-medium text-sm", className)}>
            {children}
          </span>
        );
      case Types.CAPTION2:
        return (
          <span className={clsx("font-medium text-xs", className)}>
            {children}
          </span>
        );
      case Types.BODY:
        return (
          <p className={clsx("font-normal text-sm", className)}>{children}</p>
        );
      case Types.BODY_SMALL:
        return (
          <p className={clsx("font-normal text-xs", className)}>{children}</p>
        );
      case Types.BUTTON:
        return (
          <span className={clsx("font-bold text-sm", className)}>
            {children}
          </span>
        );
      case Types.BUTTON_SMALL:
        return (
          <span className={clsx("font-bold text-xs", className)}>
            {children}
          </span>
        );
      default:
        return <span className={clsx(className)}>{children}</span>;
    }
  };
  return <Content />;
};

export default Typography;

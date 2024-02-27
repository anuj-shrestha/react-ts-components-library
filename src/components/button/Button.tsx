import React, { cloneElement, useCallback } from "react";
import "./button.scss";
import classNames from "classnames";
import debounce from "lodash.debounce";

type ButtonType = "link" | "primary" | "secondary";
type ButtonSize = "compact" | "default" | "large";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "teritiary"
  | "danger"
  | "text"
  | "tertiary";
type hoverType = "link" | "button";
type ObjectKeysInterface = {
  [key: string]: string;
};

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  href?: string | ObjectKeysInterface;
  title?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => void;
  btnType?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  target?: string;
  disabled?: boolean;
  rightIcon?: JSX.Element | null;
  leftIcon?: JSX.Element | null;
  isLoading?: boolean;
  isBlock?: boolean;
  className?: string;
  style?: React.CSSProperties;
  linkTagComponent?: JSX.Element;
  isMarketingSide?: boolean;
  btnRef?: React.MutableRefObject<HTMLButtonElement | null>;
  isExternalUrl?: boolean;
  debounceTime?: number;
  hoverEffect?: hoverType;
}

export const Button = ({
  type = "primary",
  size = "default",
  variant = "primary",
  href,
  title,
  onClick,
  btnType,
  children,
  target,
  disabled = false,
  rightIcon,
  leftIcon,
  isLoading = false,
  isBlock = false,
  className = "",
  style = {},
  linkTagComponent,
  isMarketingSide,
  btnRef,
  isExternalUrl = false,
  debounceTime = 500,
  hoverEffect,
}: ButtonProps) => {
  //constant goes here
  const isLink = type === "link";

  const loadingClassLookup = {
    compact: "pro-btn--loading-compact",
    default: "pro-btn--loading-default",
    large: "pro-btn--loading-large",
  };

  const iconSize = React.useMemo(() => {
    const sizeLookup = {
      compact: 18,
      default: 20,
      large: 24,
    };

    return sizeLookup[size] || 20;
  }, [size]);

  const buttonClasses = classNames("pro-btn", className, {
    [`pro-btn--${size}`]: !!size.length,
    [loadingClassLookup[size]]: isLoading && !!loadingClassLookup[size]?.length,
    [`pro-btn--${variant}`]: !!variant.length,
    [`${hoverEffect}`]: !!hoverEffect?.length && !isLoading,
    "pro-btn--block": isBlock,
    disabled: !!disabled,
  });

  const debouncedHandleClick = useCallback(
    debounce(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          onClick(event);
        }
      },
      debounceTime,
      { leading: true, trailing: false }
    ),
    [onClick, debounceTime]
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(event);
    }
  };

  if (isLink) {
    if (linkTagComponent && !isExternalUrl) {
      const redirectName = isMarketingSide ? "href" : "to";

      return (
        <>
          {cloneElement(
            linkTagComponent,
            {
              [redirectName]: href,
              onClick: handleClick,
              style: style,
              className: buttonClasses,
              target: target,
              title: title,
              ref: btnRef,
            },
            <>
              {isLoading ? (
                <span className="rotation-loader" />
              ) : (
                <>
                  {leftIcon &&
                    cloneElement(leftIcon, {
                      size: iconSize,
                      className: "pro-btn__icon pro-btn__icon--left",
                    })}
                  {children}
                  {rightIcon &&
                    cloneElement(rightIcon, {
                      size: iconSize,
                      className: "pro-btn__icon pro-btn__icon--right",
                    })}
                </>
              )}
            </>
          )}
        </>
      );
    }

    return (
      <a
        href={href as string}
        className={buttonClasses}
        target={target}
        title={title}
        onClick={handleClick}
        style={style}
      >
        {isLoading ? (
          <span className="rotation-loader" />
        ) : (
          <>
            {leftIcon &&
              cloneElement(leftIcon, {
                size: iconSize,
                className: "pro-btn__icon pro-btn__icon--left",
              })}
            {children}
            {rightIcon &&
              cloneElement(rightIcon, {
                size: iconSize,
                className: "pro-btn__icon pro-btn__icon--right",
              })}
          </>
        )}
      </a>
    );
  }

  return (
    <button
      type={btnType}
      className={buttonClasses}
      disabled={disabled}
      onClick={debouncedHandleClick}
      style={style}
      title={title}
      ref={btnRef}
    >
      {isLoading ? (
        <span className="rotation-loader" />
      ) : (
        <>
          {leftIcon &&
            cloneElement(leftIcon, {
              size: iconSize,
              className: "pro-btn__icon pro-btn__icon--left",
            })}
          {children}
          {rightIcon &&
            cloneElement(rightIcon, {
              size: iconSize,
              className: "pro-btn__icon pro-btn__icon--right",
            })}
        </>
      )}
    </button>
  );
};

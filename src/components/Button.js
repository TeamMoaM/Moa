import styled, { css } from "styled-components";
import ArrowUp from "../icons/arrow-up.svg";
import Plus from "../icons/plus.mobile.svg";

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 12px 20px;
    --button-radius: 8px;
  `,
  md: css`
    --button-font-size: 0.875rem;
    --button-padding: 16px 24px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-font-size: 0.875rem;
    --button-padding: 20px 28px;
    --button-radius: 8px;
  `,
};

const VARIANTS = {
  primary: css`
    --button-color: var(--white);
    --button-bg-color: var(--primary-1);
    --button-hover-bg-color: #1c2471;
  `,
  secondary: css`
    --button-color: var(--primary-1);
    --button-bg-color: var(--primary-4);
    --button-hover-bg-color: #bfbfff;
  `,
  tertiary: css`
    --button-color: var(--black);
    --button-bg-color: var(--gray-4);
    --button-hover-bg-color: #e4e4ef;
  `,
};

export default function Button({
  disabled,
  size,
  variant,
  icon,
  children,
  onClick,
  className,
  style,
}) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];
  // TODO: 아이콘 크기 재정의 필요
  const isIcon = () => {
    switch (icon) {
      case "arrowUp":
        return ArrowUp;
      case "plus":
        return Plus;
    }
  };

  return (
    <StyledButton
      disabled={disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
      onClick={onClick}
      className={className}
      style={style}
    >
      {icon && <img src={isIcon()} />}

      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Spoqa Han Sans Neo", sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  color: var(--button-color, #ffffff);
  background: var(--button-bg-color, --primary-1);

  &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #1c2471);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #1c2471);
  }
`;

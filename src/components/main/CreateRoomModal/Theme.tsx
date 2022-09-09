import { useState } from 'react';
import styled from 'styled-components';
import themeJson from '../../../theme.json';
import { ReactComponent as Up } from '../../../assets/svg/up.svg';
import { ReactComponent as Down } from '../../../assets/svg/down.svg';

export default function Theme({ onClickTheme }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');

  const onClickOption = (e) => {
    onClickTheme(e.target.value);
    setSelectedTheme(e.target.innerText);
    setIsDropDown(false);
  };

  const onClickSelect = () => {
    setIsDropDown(!isDropDown);
  };

  return (
    <Component>
      <Label>테마 *</Label>
      <SelectButton type="button" onClick={onClickSelect}>
        <Select isThemeSelected={selectedTheme !== ''}>
          {selectedTheme === '' ? '테마를 선택해주세요' : selectedTheme}
        </Select>
        <SelectIcon>
          <Up />
          <Down />
        </SelectIcon>
      </SelectButton>
      {isDropDown && (
        <DropDown>
          {themeJson.map((theme) => (
            <Option
              value={theme.value}
              key={theme.value}
              onClick={onClickOption}
            >
              {theme.name}
            </Option>
          ))}
        </DropDown>
      )}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.9rem;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  line-height: 2.9rem;
`;

const SelectButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  height: 4.9rem;
  margin-top: 0.25rem;
  background-color: #191f28;
  border-radius: 0.6rem;
  padding: 1.3rem 1.6rem;
  cursor: pointer;
`;

const Select = styled.div<{ isThemeSelected: boolean }>`
  width: 95%;
  outline: none;
  border: none;
  color: ${(props) => (props.isThemeSelected ? '#f9fafb' : 'gray')};
  font-size: 1.5rem;
  text-align: left;
`;

const SelectIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 5%;
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  background-color: #191f28;
  border-radius: 0.6rem;
  top: 8.9rem;

  @keyframes dropdown {
    0% {
      transform: translateY(-5%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 400ms ease-in-out forwards;
`;

const Option = styled.button`
  width: 100%;
  color: #f1f5f9;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  height: 4.9rem;

  &:hover {
    border-radius: 0.6rem;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`;

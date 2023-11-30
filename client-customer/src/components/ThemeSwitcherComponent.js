// components/ThemeSwitcher.tsx
import { useTheme } from "next-themes";
import {Switch} from "@nextui-org/react";
import {MoonIcon} from "../images/moonIcon";
import {SunIcon} from "../images/sunIcon";
import React from "react";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = React.useState(theme === "light");
  const toogleTheme = () =>{
    setTheme(isSelected ? "dark" : "light");
    setIsSelected(!isSelected);
  }
  return (
    <div>
      <Switch
        defaultSelected = {isSelected}
        size="lg"
        color="default"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        isSelected={isSelected} 
        onValueChange={toogleTheme}
        
      >
      </Switch>
    </div>
  )
};

export default ThemeSwitcher
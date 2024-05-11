import {useRecoilState } from "recoil";
import { UIState } from "@/contexts/atoms";
import { memo } from "react";
import { Client } from 'react-hydration-provider';

export const defaultUI = {
  colorTheme:{
    id:'default',
    name: 'Default',
    colors:['#293bff','#182399','#334756','#ff8229']
  },

  navCollapsed: true,
  navStyle: 'NAV_STYLE_MINI_SIDEBAR',
  layoutType: 'LAYOUT_TYPE_FULL',
  themeType: 'THEME_TYPE_LITE',
  width: 575,
  isDirectionRTL: false,
  platform: null
}
  

const UIProviderConst = ({platform}) => {
    
    const [UI, setUI] = useRecoilState(UIState);
    //const {colorTheme} = UI;
    //const {colors} = colorTheme;     

    return (
        <Client>
        <div className="ui_provider"></div>
        </Client>
    )
} 

const UIProvider = memo(UIProviderConst);
export default UIProvider;
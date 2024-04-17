import {useRecoilState, useRecoilValue, useSetRecoilValue } from "recoil";
import { UIState, UIWidthState } from "@/contexts/atoms";
import { useEffect, memo } from "react";

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
    console.log('running themer')
    

    return (
        <>
        <div className="ui_provider"/>
           {/*  <style jsx global>{`
                              :root{
                                --palette1: ${colors[0]};
                                --palette2: ${colors[1]};
                                --palette3: ${colors[2]};
                                --palette4: ${colors[3]};
                              }
                              `}
            </style> */}
        </>
    )
} 

const UIProvider = memo(UIProviderConst);
export default UIProvider;
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'
//import {defaultUI} from '~/appComponents/contexts/UIContext'


/** Stores*/

const { persistAtom } = recoilPersist({
  key: 'LyveContext'
});

const { persistAtom : persistTheme } = recoilPersist({
  key: 'UI'
});

const { persistAtom : persistSiteVersion } = recoilPersist({
  key: 'Lyve_ver'
});

const { persistAtom : persistLoc } = recoilPersist({
  key: 'Lyve_lx'
});

const { persistAtom : persistIntro } = recoilPersist({
  key: 'LyveIntro'
});

/*Atoms & selectors*/
export const introState = atom({
  key: 'intro',
  default: false, 
  effects_UNSTABLE: [persistAtom],
});

export const UIState = atom({
  key: 'uiState',
  default: null, 
  effects_UNSTABLE: [persistTheme],
});

export const listingViewState = atom({
    key: 'listingViewState', 
    default: 'home', 
    effects_UNSTABLE: [persistAtom],
});

export const actionsState = atom({
  key: 'actionsState', 
  default: {viewed:[]}, 
  effects_UNSTABLE: [persistAtom],
});

export const authState = atom({
  key: 'authState', 
  default: {auth_type: 'none'}, 
  effects_UNSTABLE: [persistAtom],
});

export const siteVersionState = atom({
  key: 'siteVersionState', 
  default: 'event', 
  effects_UNSTABLE: [persistSiteVersion],
});

export const userMetaState = atom({
  key: 'userMetaState', 
  default: {}, 
  effects_UNSTABLE: [persistAtom],
});


export const messagesState = atom({
  key: 'messagesState', 
  default: [], 
  //effects_UNSTABLE: [persistAtom],
});
export const storeOrderState = atom({
  key: 'storeOrderState', 
  default: 'newest', 
  //effects_UNSTABLE: [persistAtom],
});


export const activeDateState = atom({
  key: 'activeDate', 
  default: {}, 
  effects_UNSTABLE: [persistAtom],
});
export const activeReviewsState = atom({
  key: 'activeReviews', 
  default: {}, 
  //effects_UNSTABLE: [persistAtom],
});

export const pdtListyState = atom({
  key: 'pdtListy', 
  default: false,
  effects_UNSTABLE: [persistTheme], 
});

export const UIWidthState = atom({
  key: 'uiWidthState', 
  default: 575, 
  effects_UNSTABLE: [persistTheme],
});


export const listingNoticesState = atom({
  key: 'listingNoticesState', 
  default: null, 
  effects_UNSTABLE: [persistAtom],
});



export const nextPostState = atom({
  key: 'nextPostState', 
  default: null, 
  effects_UNSTABLE: [persistAtom],
});


export const locationState = atom({
  key: 'locationState',
  default: {},
  effects_UNSTABLE: [persistLoc]
});

export const noticeState = atom({
  key: 'noticeState',
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const UISizes = selector({  
  key: 'uiSizes',  
  get: ({get}) => {    
    const wid = get(UIWidthState);
    return {
      isMobile : 575 > wid,
      isTab : 768 > wid,
      isLargeTab : 992 > wid,
      isDeskTop : wid > 992
    }
  }  
});

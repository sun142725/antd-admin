import { Effect, Reducer } from 'umi';


export interface StateType {
  weigets: any[];
  modifyId: string
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    pushWeiget: Effect;
    updateWeiget: Effect;
  };
  reducers: {
    saveWeigets: Reducer<StateType>;
    setModifyId: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formDnd',

  state: {
    weigets: [],
    modifyId: ''
  },

  effects: {
    *pushWeiget({ param  }, { call, put, select }) {
      const weigets: any[] = yield select((state: any) => state.formDnd.weigets)
      console.log('chufann', param, weigets)
      // const id = Math.floor(Math.random()*10)
      yield put({
        type: 'saveWeigets',
        payload: [...weigets, param],
      });
    },
    *updateWeiget({ param  }, {select, put}) {
      const weigets: any[] = yield select((state: any) => state.formDnd.weigets)
      const modifyId: any = yield select((state: any) => state.formDnd.modifyId)
      const newWeigets = weigets.map((v, index)=>{
        if(index === modifyId){
          return Object.assign(v, param)
        }
        return v
      })
      yield put({
        type: 'saveWeigets',
        payload: [...newWeigets],
      });
    }
  },

  reducers: {
    saveWeigets(state: any, action): StateType {
      return {
        ...state,
        weigets: action.payload,
      };
    },
    setModifyId(state: any, action: any): StateType{
      return {
        ...state,
        modifyId: action.payload
      }
    },
  },
};

export default Model;

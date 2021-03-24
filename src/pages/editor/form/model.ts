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
    delWeiget: Effect;
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
    *pushWeiget({ param  }, { put, select }) {
      const weigets: any[] = yield select((state: any) => state.formDnd.weigets)
      const obj = {...param, rId: new Date().getTime()+param.id}
      yield put({
        type: 'saveWeigets',
        payload: [...weigets, obj],
      });
    },
    *updateWeiget({ param  }, {select, put}) {
      const weigets: any[] = yield select((state: any) => state.formDnd.weigets)
      const modifyId: any = yield select((state: any) => state.formDnd.modifyId)
      const newWeigets = weigets.map((v, index)=>{
        if(v.rId === modifyId){
          console.log('param', param)
          return param
        }
        return v
      })
      console.log('newweiget', newWeigets)
      yield put({
        type: 'saveWeigets',
        payload: [...newWeigets],
      });
    },
    *delWeiget({}, {select, put}) {
      const weigets: any[] = yield select((state: any) => state.formDnd.weigets)
      const modifyId: any = yield select((state: any) => state.formDnd.modifyId)
      const newWeigets = weigets.filter(v=>v.rId !== modifyId)
      yield put({
        type: 'saveWeigets',
        payload: [...newWeigets],
      });
      put({
        type: 'setModifyId',
        payload: ""
      })
    }
  },

  reducers: {
    saveWeigets(state: any, action): StateType {
      console.log('action', action)
      return {
        ...state,
        weigets: [...action.payload],
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

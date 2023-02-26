import { Sayable } from 'wechaty';
import { echo } from './echo';
import * as fund from './fund'

type Route = {
  keyword: string | RegExp;
  handle: ((text: string) => Sayable) | ((text: string) => Promise<Sayable>);
}

export const routes: Route[] = [
  { keyword: '', handle: echo },
  { keyword: '基金', handle: fund.topFund },
]
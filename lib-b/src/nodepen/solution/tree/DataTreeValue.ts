import { SolutionValue, SolutionValueType } from '../value'

export type DataTreeValue<T extends SolutionValueType> = {
    type: T
    data: SolutionValue[T]
}
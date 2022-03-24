export interface IProp {
  label: string
  value: string
}

export interface ITree extends IProp {
  children?: ITree[]
}

export interface IDesignerProps {
  materialSettings: ITree[]
}

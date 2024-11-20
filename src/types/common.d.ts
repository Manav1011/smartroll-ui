export interface Page {
  id: string
  path: string
  name: string
}

export interface SidebarLink extends Omit<Page, 'path'> {
  path?: string
  children?: Page[]
  icon?: JSX.Element
}


export interface DecodedToken {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  obj: {
    id: number
    profile: {
      name: string | null
      email: string
      role: string
    }
    branch: {
      branch_name: string
      branch_code: string
      slug: string
    }
  }
}

// for displaying the streams,semester and divisions and batches
interface SelectionResponse {
  slug : string
  name : string 
}

export interface SelectionProps {
  title: string
  selectedValue: string
  selectedValue2?: string
  onValueChange: (value: string) => void
  placeholder: string
  data : Array<SelectionResponse> | null
  optionTitle?: string | null
}

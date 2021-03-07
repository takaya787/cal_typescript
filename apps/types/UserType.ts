//User登録時のpost内容
export type UserValueType = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}
//Login時のpost内容
export type LoginValueType = {
  email: string,
  password: string
}

type UserLoginSuccessType = {
  user: {
    id: number,
    name: string,
    email: string,
    password_digest: string,
    created_at: string,
    updated_at: string
  },
  token: string
}

type UserLoginErrorType = {
  error: "Invalid username or password"
}

//SuccessとErrorのunion型を作成する
export type UserLoginType = UserLoginSuccessType | UserLoginErrorType

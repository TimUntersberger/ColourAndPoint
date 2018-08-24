const InvalidUsername = {
  message: "The username is invalid"
}

const InvalidPassword = {
  message: "The username is invalid"
}

const UsernameAlreadyUsed = {
  message: "The username is already being used",
}

interface UniqueConstraintConflictArgs{
  table: string,
  column: string,
  value: any
}

const UniqueConstraintConflict = (args: UniqueConstraintConflictArgs) => ({
  table: args.table,
  column: args.column,
  value: args.value,
  message: `Unique constraint of ${args.table}#column '${args.column}' complained that the value '${args.value}' already exists.`
})

export default { InvalidUsername, InvalidPassword, UsernameAlreadyUsed, UniqueConstraintConflict }
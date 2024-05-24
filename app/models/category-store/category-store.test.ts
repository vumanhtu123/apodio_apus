import { CategoryStoreModel } from "./category-store"

test("can be created", () => {
  const instance = CategoryStoreModel.create({})

  expect(instance).toBeTruthy()
})

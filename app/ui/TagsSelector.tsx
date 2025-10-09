'use client'
import React from 'react'
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui/shadcn-io/tags'
import { CheckIcon } from 'lucide-react'
import { encounterTags } from '../lib/constants'

const TagsSelector = ({
  categories,
  setCategories,
}: {
  categories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
}): React.ReactElement => {
  // const [selected, setSelected] = useState<string[]>([])
  const handleRemove = (value: string) => {
    if (!categories.includes(value)) {
      return
    }
    console.log(`removed: ${value}`)
    setCategories((prev) => prev.filter((v) => v !== value))
  }
  const handleSelect = (value: string) => {
    if (categories.includes(value)) {
      handleRemove(value)
      return
    }
    console.log(`selected: ${value}`)
    setCategories((prev) => [...prev, value])
    console.log('Current categories:', categories)
  }
  return (
    <Tags className="max-w-[300px]">
      <TagsTrigger>
        {categories.map((tag) => (
          <TagsValue
            key={tag}
            onRemove={() => handleRemove(tag)}
            className="bg-gray-200"
          >
            {encounterTags.find((t) => t.id === tag)?.label}
          </TagsValue>
        ))}
      </TagsTrigger>
      <TagsContent className="bg-white">
        <TagsInput placeholder="Search tag..." />
        <TagsList className="bg-white">
          <TagsEmpty />
          <TagsGroup>
            {encounterTags.map((tag) => (
              <TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}>
                {tag.label}
                {categories.includes(tag.id) && (
                  <CheckIcon className="text-muted-foreground" size={14} />
                )}
              </TagsItem>
            ))}
          </TagsGroup>
        </TagsList>
      </TagsContent>
    </Tags>
  )
}
export default TagsSelector

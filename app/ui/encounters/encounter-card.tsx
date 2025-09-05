import React from 'react'
import { EncounterWithUser } from '../../types/encounters'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline'

export default function EncounterCard({
  encounter,
}: {
  encounter: EncounterWithUser
}): React.ReactElement {
  const { title, content, evidence, media, likes, creator, comments } =
    encounter

  return (
    <Link href={`/encounters/${encounter.id}`} className="flex flex-col">
      <div className="border-b border-gray-300 max-w-sm mx-auto">
        <div className="flex max-w-4xl flex-col p-6 my-1.5 mx-1.5 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
          <h2 className="capitalize font-semibold text-gray-700">
            {creator.username}
          </h2>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>

          <p className="flex flex-wrap gap-2 mb-2">
            {evidence.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200/20 px-1.5 py-0.5 rounded text-sm"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </p>

          <p className="overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] mb-4">
            {content}
          </p>

          {media.map((item) => (
            <div
              key={item}
              className="w-full max-h-200 overflow-hidden rounded mb-4"
            >
              <Image
                alt={item}
                src={item}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          ))}
          <div className="flex gap-9">
            <div className="comments flex gap-1 hover:bg-gray-300">
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
              {comments.length}
            </div>
            <div className="likes flex gap-1">
              <button className="hover:bg-gray-300">
                <ArrowDownIcon className="w-6 h-6" />
              </button>
              <span>{likes}</span>
              <button className="hover:bg-gray-300">
                <ArrowUpIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

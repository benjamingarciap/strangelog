import React from 'react'
import { notFound } from 'next/navigation'
import { UIEnrichedEncounter } from '../../types/encounters'
import Image from 'next/image'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function EncounterDetail({
  encounter,
}: {
  encounter: UIEnrichedEncounter
}): React.ReactElement {
  const { title, content, evidence, media, creator, likes, comments } =
    encounter
  if (!encounter) {
    notFound()
  }

  return (
    <div className=" pt-12">
      <div className="flex max-w-4xl flex-col p-6 my-1.5 mx-1.5 rounded-2xl transition-colors duration-200">
        <Link href={`/users/${creator.id}`}>
          <h2 className="capitalize font-semibold text-gray-700 hover:underline">
            {creator?.username ?? 'Unknown'}
          </h2>
        </Link>
        <h3 className="text-xl font-semibold mb-2 capitalize">{title}</h3>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-14">
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
        </div>
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
        <div className="flex items-center gap-2 mt-4">
          <button className="bg-blue-900 text-white rounded-xl px-3 py-4">
            Comment
          </button>
          <textarea
            name="comment"
            id="comment"
            className="p-2 border border-gray-400 rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {comments &&
            comments.map((comment) => (
              <div key={comment.id}>
                <Link href={`/users/${comment.author.id}`}>
                  <p className="font-semibold capitalize hover:underline">
                    {comment.author.username ?? 'Unknown'}
                  </p>
                </Link>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

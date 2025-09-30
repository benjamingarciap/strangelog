import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '../../../lib/utils'
import { formatCategory } from '../../lib/utils/formatCategory'
import { EncounterCategory } from '../../generated/prisma'

const cathegories: EncounterCategory[] = [
  'UAP_LUMINOUS_ORBS',
  'UAP_DISC',
  'UAP_TRIANGLE',
  'UAP_CYLINDER',
  'UAP_SPHERE',
  'UAP_TRANS_MEDIUM',
  'UAP_FORMATION_SWARM',
  'CE_1',
  'CE_2',
  'CE_3',
  'CE_4_ABDUCTION',
  'CE_5_INITIATED_CONTACT',
  'CE_6_INJURY',
  'CE_7_LONG_TERM_CONTACT',
  'ENTITY_ENCOUNTER',
  'ABDUCTION_SCENARIO',
  'POLTERGEIST_ACTIVITY',
  'PORTAL_DIMENSIONAL',
  'CATTLE_MUTILATION',
  'MEN_IN_BLACK',
  'MISSING_TIME',
  'PSYCHIC_EFFECTS',
  'TRACE_EVIDENCE',
  'EM_INTERFERENCE',
  'RADIATION_EFFECTS',
  'WEATHER_DISTURBANCE',
  'OTHER',
]

export function SideMenu(): React.ReactElement {
  const { isOpen, filterCategory } = useSideMenuStore()
  const { data: session } = useSession()
  // const [filterCategory, setFilterCategory] = useState<string>('')

  return (
    <div
      className={`fixed top-0 left-0 h-full w-50 bg-white z-[2] transition-transform duration-300 ease-in-out
    ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } overflow-hidden drop-shadow-md`}
    >
      <nav className="flex flex-col items-start p-4 justify-start max-h-full h-full space-y-3 w-full mt-[55px]">
        {session && (
          <div className="flex flex-col justify-between items-start w-full gap-4 h-[85%]">
            <div>
              <p className="text-gray-500">Filter by:</p>
              <Accordion collapsible type="single" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="border-b-[1px] border-gray-300 pb-1 mb-2 w-[169px] rounded-none cursor-pointer font-semibold text-gray-500 min-w-full">
                    Cathegory
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col justify-start items-start gap-1 pl-2 overflow-auto max-h-[501px]">
                    {cathegories.map((cathegory) => (
                      <button
                        key={cathegory}
                        className={cn(
                          'flex justify-center items-center cursor-pointer hover:underline p-0 text-gray-500',
                          { underline: filterCategory === cathegory }
                        )}
                        onClick={() => {
                          // setFilterCategory(cathegory)
                          useSideMenuStore
                            .getState()
                            .setFilterCategory(cathegory)
                          console.log(
                            'FILTER CATEGORY: SIDE MENU--->',
                            useSideMenuStore.getState().filterCategory
                          )
                        }}
                      >
                        {formatCategory(cathegory)}
                      </button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className={cn(
                'flex justify-start cursor-pointer hover:underline p-0 text-gray-500 font-semibold border-b-[1px] border-gray-300 pb-1 mb-2 w-full'
              )}
            >
              Log out
            </button>
          </div>
        )}
      </nav>
    </div>
  )
}

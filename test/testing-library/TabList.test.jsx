import React from 'react'
import { describe, expect, it } from 'vitest'
import { TestTabList } from '../utils/TestTabList'
import { screen, render } from '@testing-library/react'

describe('TabList', () => {
    describe('WAI-ARIA Roles, States, and Properties', () => {
        it('The element that serves as the container for the set of tabs has role of tablist', () => {
            render(
                <TestTabList 
                    tabs={[
                        { name: 'Primera tab', content: 'Contenido de la primera tab'}
                    ]} 
                />
            )
            expect(screen.getByRole('tablist'))
        })

        it('Each element that serves as a tab has role tab and is contained within the element with role tablist.', () => {
            const tabs = [
                        { name: 'Primera tab', content: 'Contenido de la primera tab'},
                        { name: 'Segunda tab', content: 'Contenido de la segunda tab'},

            ]
            const { container } = render(
                <TestTabList tabs={tabs} />
            )

            const tabElements = container.querySelectorAll('[role="tablist"] > [role="tab"]')
            
            expect(tabElements.length).toEqual(tabs.length)

            const tabNames = tabs.map(tab => tab.name)
            const tabElementsNames = Array.from(tabElements).map(tab => tab.textContent)
            
            expect(tabElementsNames).toEqual(tabNames)
            
        })
    })

})
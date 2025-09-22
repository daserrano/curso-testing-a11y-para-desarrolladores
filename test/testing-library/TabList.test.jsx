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
                        { name: 'Primera tab', content: 'Contenido de la primera tab' }
                    ]}
                />
            )
            expect(screen.getByRole('tablist'))
        })

        it('Each element that serves as a tab has role tab and is contained within the element with role tablist.', () => {
            const tabs = [
                { name: 'Primera tab', content: 'Contenido de la primera tab' },
                { name: 'Segunda tab', content: 'Contenido de la segunda tab' },

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

        it('Each element with role tab has the property aria-controls referring to its associated tabpanel element', () => {
            const tabs = [
                { name: 'Primera tab', content: 'Contenido de la primera tab' },
                { name: 'Segunda tab', content: 'Contenido de la segunda tab' },

            ]
            render(<TestTabList tabs={tabs} />)

            const tabElements = screen.getAllByRole('tab')
            const tabPanelElements = screen.getAllByRole('tabpanel', {
                hidden: true,
            })

            const ariaControls = Array.from(tabElements).map(tab =>
                tab.getAttribute('aria-controls'),
            )

            const panelId = Array.from(tabPanelElements).map(tabPanel =>
                tabPanel.getAttribute('id')
            )

            expect(ariaControls).toEqual(panelId)

        })

        it('The active tab element has the state aria-selected set to true and all other tab elements have it set to false', () => {
            const tabs = [
                { name: 'Primera tab', content: 'Contenido de la primera tab' },
                { name: 'Segunda tab', content: 'Contenido de la segunda tab' },

            ]
            const activeIndex = 0
            render(<TestTabList tabs={tabs} />)

            const tabElements = screen.getAllByRole('tab')

            tabElements.forEach((tab, index) => {
                expect(tab.getAttribute('aria-selected')).toBe(
                    index === activeIndex ? 'true' : 'false'
                )
            })
        })

        it('Each element with role tabpanel has the propery aria-labelledby referring to its associated tab element', () => {
            const tabs = [
                { name: 'Primera tab', content: 'Contenido de la primera tab' },
                { name: 'Segunda tab', content: 'Contenido de la segunda tab' },

            ]

            render(<TestTabList tabs={tabs} />)

            const tabElements = screen.getAllByRole('tab')

            const tabPanelElements = screen.queryAllByRole('tabpanel', {
                hidden: true
            })

            screen.debug()
            
            tabPanelElements.forEach((tabPanel, index) => {
                expect(tabPanel.getAttribute('aria-labelledby')).toEqual(
                    Array.from(tabElements).at(index).id,
                )
            })
        })

        it.skip('If a tab element has a popup menu, it has the property aria-haspopup set to either menu or true', () => {

        })

        it.skip('If the tablist element is vertically oriented, it has the property aria-orientation set to vertical. The default value of aria-orientation for a tablist', () => {

        })
    })

})
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

const pages = [1, 2, 3]

export function CatalogPagination({ page = 1, onPageChange }) {
  return (
    <Pagination>
      <PaginationContent>
        {pages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={pageNum === page}
              onClick={(event) => {
                event.preventDefault()
                onPageChange?.(pageNum)
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}

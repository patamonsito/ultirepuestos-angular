import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

export class ItemsDataSource extends DataSource<string | undefined> {
    private itemsInMemory = Array.from<string>({ length: 0});
    private itemChange$: BehaviorSubject<string[]>;
    private destroy$: Subject<boolean> = new Subject();
    private pageSize = 40;
    private lastLoadedPage = 0;
    private source = [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "2",
    ]

    constructor() {
        super();
        this.itemChange$ = new BehaviorSubject(this.itemsInMemory);
        this.getInformation();
    }
    
    connect(collectionsViewer: CollectionViewer) {
        collectionsViewer.viewChange.pipe(takeUntil(this.destroy$)).subscribe((range) => {
            const currentPage = Math.floor(range.end / this.pageSize);
            if(currentPage > this.lastLoadedPage){ // 1 es mayor a 0 paginacion
                //obtener datos
                this.lastLoadedPage = currentPage;
                this.getInformation();
            }
        });
    return this.itemChange$;
    }

    getInformation() {
        for(let i = 0; i < this.pageSize; i++){
            this.itemsInMemory = [
                ...this.itemsInMemory,
                this.source[Math.floor(Math.random() * this.source.length) + 1]
            ];
        }
        this.itemChange$.next(this.itemsInMemory)
    }

    disconnect(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}
<script>
export default {
    props: {
        catsntools: {
            type: Array,
            required: true,
            default: () => []
        }
    }
}


</script>
<template>
    <div class="font-normal mt-6">
                        
        <h4 class="text-lg font-bold text-white mb-6">Technologies &amp; Tools</h4>

        <div class="overflow-hidden rounded-3xl w-[calc(100% + 6em)] -mx-12 md:mx-0">
            <div class="w-full overflow-x-auto">
                <table class="table table-zebra table-xs w-full">
                    <thead class="w-full">
                        <tr>
                            <th><h5 class="font-bold">Category</h5></th>
                            <th><h5 class="font-bold">Tools</h5></th>
                        </tr>
                    </thead>
                    <tbody class="w-full">
                        <tr v-for="tech in catsntools">
                            <td class="w-1/3"><p>{{ tech.category }}</p></td>
                            <td class="w-2/3"><p>{{ tech.tools }}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>  
</template>
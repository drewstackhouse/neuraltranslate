<template>
  <v-app dark style="background-color: #f5f5f5">
    <v-app-bar
      height="100"
      dark
      color="primary"
      flat
      fixed
      app
    >
    <v-avatar tile height="50" class="mr-6">
      <v-img src="nodes.png"></v-img>
    </v-avatar>
    <span class="tex0t-h6">Neural Translate</span>
    <v-spacer />
    <v-btn x-large text plain class="text-h6 font-weight-light">Log In</v-btn>
    <v-btn x-large text plain class="text-h6 font-weight-light">Sign Up</v-btn>
    <v-avatar height="50" class="mr-6" color="accent">
      DS
    </v-avatar>
    </v-app-bar>
    <v-main> 
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      height="300"
      dark
      color="primary"
      absolute
      app
    >
      <v-row align="center" justify="center" class="mx-0">
        <v-col cols="3">
          <v-avatar height="150" width="150">
            <v-img contain src="nodes.png"></v-img>
          </v-avatar>
        </v-col>
                <v-col cols="3" v-for="(item, i) in Object.entries(footer)" :key="i" :value="item">
                  <v-list style="background-color: rgba(0,0,0,0)">
                    <v-list-item>
                      <v-list-item-title class="font-weight-regular text-h6">
                        {{item[0]}}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-for="(subitem, j) in item[1]" :key="j" :value="subitem" class="text-h6 font-weight-thin">
                      <v-btn class="pl-0 text-h6 font-weight-thin" plain :to="subitem.href">{{subitem.label}}</v-btn>
                    </v-list-item>
                  </v-list>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    footer: {
      "Neural Translate": [
        {
          label: "About",
          href: "/"
        },
        {
          label: "Account",
          href: "/"
        }
      ],
      "Resources": [
        {
          label: "How to Use",
          href: "/"
        },
        {
          label: "API Docs",
          href: "/"
        }
      ],
      "Contact": [
        {
          label: "Contribute",
          href: "/"
        },
        {
          label: "Who We Are",
          href: "/"
        }
      ],
    }
  })
}
</script>

<style>

.v-btn {
  text-transform: none;
}

</style>
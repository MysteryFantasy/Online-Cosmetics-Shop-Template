<template>
    <div class="v-notification">
        <transition-group name="v-transition-animation" class="messages_list">
            <div class="v-notification__content"
                v-for="message in messages"
                :key="message.id"
                :class="message.icon"
            >
                <div class="content__text">
                    <span>{{message.name}}</span>
                    <i class="material-icons">{{message.icon}}</i>
                </div>
                <div class="content__buttons">
                    <button v-if="rightButton.length">{{rightButton}}</button>
                    <button v-if="leftButton.length">{{leftButton}}</button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "v-notification",
    props: {
        messages: {
            type: Array,
            default: () => {
                return []
            }
        },
        rightButton: {
            type: String,
            default: ''
        },
        leftButton: {
            type: String,
            default: ''
        },
        timeout: {
            type: Number,
            default:3000
        }
    },
    methods: {
        hideNotification() {
            let vm = this;
            if (this.messages.length) {
                setTimeout(function(){
                    vm.messages.splice(vm.messages.length -1, 1);
                }, vm.timeout)
            }
        }
    },
    watch: {
        messages() {
            this.hideNotification();
        }
    },
    mounted() {
        this.hideNotification();
    }
}
</script>

<style>
.v-notification {
    position: fixed;
    top: 140px;
    right: 16px;
    z-index: 10;
    display: flex;
}
.v-transition-animation-enter {
    transform: translateX(120px);
    opacity: 0;
}
.v-transition-animation-enter-active {
    transition: all .6s ease;
}
.v-transition-animation-enter-to {
    opacity: 1;
}
.v-transition-animation-leave {
    height: 50px;
    opacity: 1;
}
.v-transition-animation-leave-active {
    transition: transform .6s ease, opacity .6s, height .6s .2s;
}
.v-transition-animation-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
}
.v-transition-animation-move {
    transition: transform .6s ease; 
}
.v-notification__content {
    padding: 16px;
    border-radius: 4px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-bottom: 16px;
}
.v-notification__content.check_circle {
    background: rgba(0, 128, 0, 0.767);
}
.v-notification__content.error {
    background: rgba(255, 0, 0, 0.767);
}
.v-notification__content.warning {
    background: rgba(255, 166, 0, 0.767);
}
.content__text {
    display: flex;
    align-items:center;
    justify-content:space-between;
}
.material-icons {
    margin-left: 16px;
}
</style>